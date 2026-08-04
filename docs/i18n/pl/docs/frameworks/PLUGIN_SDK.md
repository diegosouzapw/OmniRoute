---
title: "OmniRoute Plugin SDK"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Plugin SDK

## Szybki start

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

## Referencja API

### `definePlugin(def: PluginDefinition): Plugin`

Funkcja fabrykująca, która tworzy obiekt Plugin z wartościami domyślnymi.

**Parametry:**

- `name` (string, required) — Nazwa wtyczki w kebab-case
- `priority` (number, optional, default: 100) — Niższa wartość uruchamia się wcześniej
- `enabled` (boolean, optional, default: true) — Czy startować włączona?
- `onRequest` (function, optional) — Uruchamiany przed chat handlerem
- `onResponse` (function, optional) — Uruchamiany po chat handlerze
- `onError` (function, optional) — Uruchamiany przy błędzie handlera

### `blockRequest(response?): BlockingHookResult`

Blokuje żądanie i opcjonalnie zwraca niestandardową odpowiedź.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

Modyfikuje body żądania, zanim dotrze do providera.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Dołącza metadane do kontekstu żądania.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Kontekst wtyczki (`PluginContext`)

| Field       | Type                      | Description                    |
| ----------- | ------------------------- | ------------------------------ |
| `requestId` | `string`                  | Unikalny identyfikator żądania |
| `model`     | `string`                  | Żądana nazwa modelu            |
| `provider`  | `string`                  | ID docelowego providera        |
| `body`      | `Record<string, unknown>` | Body żądania                   |
| `headers`   | `Record<string, string>`  | Nagłówki żądania               |
| `metadata`  | `Record<string, unknown>` | Mutowalne metadane             |
| `timestamp` | `number`                  | Znacznik czasu żądania         |

## Manifest (`plugin.json`)

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
    "apiKey": { "type": "string", "description": "API key for external service" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

### Priorytet hooków

Hooki można konfigurować z priorytetem (niższy = uruchamia się wcześniej):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Albo jako proste wartości boolean (domyślny priority 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## System uprawnień

Wtyczki działają w sandboxowanym kontekście VM. Dostęp do zasobów zewnętrznych wymaga jawnych uprawnień:

| Permission   | Grants                                                       |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | Read-only `process.env` proxy                                |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

Bez uprawnienia odpowiadające globals po prostu nie są dostępne w sandboxie.

## Schemat konfiguracji

Zdefiniuj konfigurowalne ustawienia w `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "External API key" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Typy pól: `string`, `number`, `boolean`, `select`

Opcje pól: `default`, `min`, `max`, `enum`, `description`

Wartości konfiguracji są utrwalane w bazie danych i dostępne przez stronę konfiguracji w dashboardzie.

## Wbudowane zdarzenia

| Event             | When                                            | Payload                       |
| ----------------- | ----------------------------------------------- | ----------------------------- |
| `onRequest`       | Przed chat handlerem                            | Request context               |
| `onResponse`      | Po chat handlerze                               | Response data                 |
| `onError`         | Przy błędzie handlera                           | Error object                  |
| `onModelSelect`   | Model wybrany do routingu                       | Model info                    |
| `onComboResolve`  | Rozwiązany routing combo                        | Combo targets                 |
| `onRateLimit`     | Trafiony rate limit                             | Limit info                    |
| `onQuotaExhaust`  | Wyczerpana quota                                | Quota info                    |
| `onProviderError` | Provider zwrócił błąd                           | Error details                 |
| `onStreamStart`   | Rozpoczęty stream SSE                           | Stream info                   |
| `onStreamEnd`     | Zakończony stream SSE                           | Stream stats                  |
| `onInstall`       | Wtyczka zainstalowana                           | `{ name, version, manifest }` |
| `onActivate`      | Wtyczka aktywowana                              | `{ name, version, manifest }` |
| `onDeactivate`    | Wtyczka deaktywowana                            | `{ name, version, manifest }` |
| `onUninstall`     | Wtyczka odinstalowana (przed usunięciem plików) | `{ name, version, manifest }` |

## Przykłady

### Request Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Rate Limiter

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 minute
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

### Response Transformer

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
