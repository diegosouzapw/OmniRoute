# OmniRoute Plugin SDK (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## 빠른 시작

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "my-plugin",
  priority: 50,
  onRequest: async (ctx) => {
    console.log(`Request ${ctx.requestId} for ${ctx.model}`);
  },
  onResponse: async (ctx, response) => {
    console.log(`Response for ${ctx.requestId}`);
    return response;
  },
  onError: async (ctx, error) => {
    console.error(`Error: ${error.message}`);
  },
});
```

## API 레퍼런스

### `definePlugin(def: PluginDefinition): Plugin`

기본값이 적용된 Plugin 객체를 생성하는 팩토리 함수입니다.

**매개변수:**

- `name` (string, 필수) — kebab-case 형식의 플러그인 이름
- `priority` (number, 선택 사항, 기본값: 100) — 값이 낮을수록 먼저 실행
- `enabled` (boolean, 선택 사항, 기본값: true) — 활성화된 상태로 시작할지 여부
- `onRequest` (function, 선택 사항) — 채팅 핸들러 전에 실행
- `onResponse` (function, 선택 사항) — 채팅 핸들러 후에 실행
- `onError` (function, 선택 사항) — 핸들러 오류 발생 시 실행

### `blockRequest(response?): BlockingHookResult`

요청을 차단하고 선택적으로 사용자 지정 응답을 반환합니다.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

프로바이더에 도달하기 전에 요청 본문을 수정합니다.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

요청 컨텍스트에 메타데이터를 추가합니다.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## 플러그인 컨텍스트 (`PluginContext`)

| 필드        | 타입                      | 설명                   |
| ----------- | ------------------------- | ---------------------- |
| `requestId` | `string`                  | 고유한 요청 식별자     |
| `model`     | `string`                  | 요청된 모델 이름       |
| `provider`  | `string`                  | 대상 프로바이더 ID     |
| `body`      | `Record<string, unknown>` | 요청 본문              |
| `headers`   | `Record<string, string>`  | 요청 헤더              |
| `metadata`  | `Record<string, unknown>` | 변경 가능한 메타데이터 |
| `timestamp` | `number`                  | 요청 타임스탬프        |

## 매니페스트 (`plugin.json`)

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "A sample plugin",
  "author": "your-name",
  "main": "index.js",
  "hooks": {
    "onRequest": { "enabled": true, "priority": 50 },
    "onResponse": true,
    "onError": false
  },
  "requires": {
    "permissions": ["network", "file-read"]
  },
  "enabledByDefault": false,
  "configSchema": {
    "apiKey": {
      "type": "string",
      "description": "API key for external service"
    },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

### 훅 우선순위

훅에 우선순위를 설정할 수 있습니다(값이 낮을수록 먼저 실행됨).

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

또는 단순한 불리언 값으로 설정할 수 있습니다(기본 우선순위는 100).

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## 권한 시스템

플러그인은 샌드박스 VM 컨텍스트에서 실행됩니다. 외부 리소스에 접근하려면 명시적인 권한이 필요합니다.

| 권한         | 허용 항목                                                    |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | 읽기 전용 `process.env` 프록시                               |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

권한이 없으면 해당 전역 항목을 샌드박스에서 사용할 수 없습니다.

## 구성 스키마

`configSchema`에서 구성 가능한 설정을 정의합니다.

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "외부 API 키" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

필드 유형: `string`, `number`, `boolean`, `select`

필드 옵션: `default`, `min`, `max`, `enum`, `description`

구성 값은 데이터베이스에 저장되며 대시보드 구성 페이지를 통해 접근할 수 있습니다.

## 기본 제공 이벤트

| 이벤트            | 발생 시점                              | 페이로드                      |
| ----------------- | -------------------------------------- | ----------------------------- |
| `onRequest`       | 채팅 핸들러 실행 전                    | 요청 컨텍스트                 |
| `onResponse`      | 채팅 핸들러 실행 후                    | 응답 데이터                   |
| `onError`         | 핸들러 오류 발생 시                    | 오류 객체                     |
| `onModelSelect`   | 라우팅할 모델이 선택되었을 때          | 모델 정보                     |
| `onComboResolve`  | 조합 라우팅이 결정되었을 때            | 조합 대상                     |
| `onRateLimit`     | 요청 속도 제한에 도달했을 때           | 제한 정보                     |
| `onQuotaExhaust`  | 할당량이 소진되었을 때                 | 할당량 정보                   |
| `onProviderError` | 제공자가 오류를 반환했을 때            | 오류 세부 정보                |
| `onStreamStart`   | SSE 스트림이 시작되었을 때             | 스트림 정보                   |
| `onStreamEnd`     | SSE 스트림이 종료되었을 때             | 스트림 통계                   |
| `onInstall`       | 플러그인이 설치되었을 때               | `{ name, version, manifest }` |
| `onActivate`      | 플러그인이 활성화되었을 때             | `{ name, version, manifest }` |
| `onDeactivate`    | 플러그인이 비활성화되었을 때           | `{ name, version, manifest }` |
| `onUninstall`     | 플러그인이 제거되었을 때(파일 삭제 전) | `{ name, version, manifest }` |

## 예제

### 요청 로거

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### 요청 속도 제한기

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1분
    const maxRequests = 100;

    const timestamps = (requests.get(key) || []).filter((t) => t > now - window);
    timestamps.push(now);
    requests.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return blockRequest({ error: "Rate limit exceeded", status: 429 });
    }
  },
});
```

### 응답 변환기

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "response-transformer",
  onResponse: async (ctx, response) => {
    if (response.choices) {
      response.choices = response.choices.map((c: any) => ({
        ...c,
        message: { ...c.message, content: c.message.content.trim() },
      }));
    }
    return response;
  },
});
```
