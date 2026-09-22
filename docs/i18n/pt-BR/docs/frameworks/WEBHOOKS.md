# Webhooks (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Fonte da verdade:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute pode disparar webhooks HTTP em eventos da plataforma. Use-os para fazer integrações com
Slack, PagerDuty, Datadog, serviços internos de alertas ou qualquer receptor HTTP.

O dispatcher assina cada entrega com HMAC-SHA256, tenta novamente em caso de
falhas transitórias, monitora a integridade da entrega por webhook e desabilita automaticamente endpoints que
continuam falhando.

## Eventos compatíveis

Atualmente, o tipo `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, consumido por `src/lib/webhookDispatcher.ts`) modela exatamente quatro eventos:

| Evento              | Disparado quando                                                        |
| ------------------- | ----------------------------------------------------------------------- |
| `request.completed` | Uma solicitação com proxy é concluída com sucesso                       |
| `request.failed`    | Uma solicitação com proxy falha após todas as novas tentativas/fallback |
| `quota.exceeded`    | Uma chave de API ultrapassa um limite de orçamento/cota                 |
| `test.ping`         | Evento sintético usado pelo endpoint de teste                           |

As assinaturas aceitam o literal `"*"` para receber todos os eventos. Nomes de eventos
desconhecidos em `events` são ignorados no momento do disparo.

> Observação: a API do dispatcher está conectada, mas os pontos de chamada em produção para alguns dos
> eventos diferentes de `test.ping` ainda estão sendo implementados. Verifique `grep dispatchEvent` para saber
> quais fluxos invocam atualmente o dispatcher na sua versão.

## Arquitetura

```
Chamador (handler, serviço, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filtrar por webhook.events
    -> para cada correspondência (em paralelo):
       deliverWebhook(url, payload, secret)
         criar payload { event, timestamp, data }
         assinar o corpo com HMAC-SHA256 (se houver um secret)
         fazer POST com timeout de 10s
         tentar novamente até 3 vezes em caso de erro 5xx / erro de rede
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

O disparo é feito sem aguardar o resultado para o chamador: `Promise.allSettled` suprime
erros individuais de cada webhook, portanto um receptor com problemas não pode bloquear os demais.

## Assinatura HMAC

Quando um webhook tem um `secret`, o OmniRoute assina o corpo JSON e envia:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <evento>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<HMAC-SHA256(secret, corpo) em hexadecimal>
```

> Os nomes dos cabeçalhos usam o prefixo `X-Webhook-*` (não `X-OmniRoute-*`). O valor da assinatura
> é `sha256=<hex>` — verifique o prefixo completo.

Se `createWebhook` for chamado sem um secret, o módulo do banco de dados gerará um
(`whsec_<48 hex>`) para que todos os webhooks sejam assinados por padrão.

### Verificação no receptor

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Sempre faça a verificação em relação ao corpo **bruto** da solicitação, antes de qualquer processamento de JSON.

## Política de novas tentativas e falhas

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Tempo limite de 10 segundos por tentativa (`AbortController`).
- Respostas HTTP 2xx são consideradas bem-sucedidas.
- Respostas HTTP 3xx/4xx são consideradas um status final sem novas tentativas — registradas como entregues
  com `success = res.ok`.
- Respostas HTTP 5xx e erros de rede são repetidos com espera exponencial:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Após `maxRetries`, a entrega é registrada como falha.
- Cada entrega atualiza `last_triggered_at`, `last_status` e redefine ou
  incrementa `failure_count`.
- O despachante chama `disableWebhooksWithHighFailures(10)` após cada distribuição,
  portanto, qualquer webhook com `failure_count >= 10` é desabilitado automaticamente.

## Banco de dados

Tabela `webhooks` (migração `011_webhooks.sql`):

| Coluna              | Tipo    | Observações                                               |
| ------------------- | ------- | --------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                      |
| `url`               | TEXT    | URL de destino                                            |
| `events`            | TEXT    | Array JSON; padrão `["*"]`                                |
| `secret`            | TEXT    | Segredo HMAC (gerado automaticamente se omitido)          |
| `enabled`           | INT     | 0/1; o padrão é 1                                         |
| `description`       | TEXT    | Identificador descritivo opcional                         |
| `created_at`        | TEXT    | `datetime('now')`                                         |
| `last_triggered_at` | TEXT    | Atualizado a cada tentativa de entrega                    |
| `last_status`       | INT     | Status HTTP da última tentativa (0 = rede)                |
| `failure_count`     | INT     | Redefinido como 0 em caso de sucesso, +1 em caso de falha |

O histórico de entregas é persistido na tabela dedicada `webhook_deliveries`
(migração `069_webhook_deliveries.sql`, gravada por meio de
`src/lib/db/webhookDeliveries.ts::insertDelivery` em cada tentativa), além
dos contadores agregados na linha de `webhooks`. Os metadados de tipo (Slack / Discord /
Telegram / transformadores de payload personalizados) foram adicionados por `070_webhooks_kind_metadata.sql`.

## API REST

Todos os endpoints exigem autenticação de gerenciamento (`requireManagementAuth`).

| Endpoint                        | Método | Descrição                                      |
| ------------------------------- | ------ | ---------------------------------------------- |
| `/api/webhooks`                 | GET    | Lista webhooks (segredos mascarados)           |
| `/api/webhooks`                 | POST   | Cria um webhook                                |
| `/api/webhooks/[id]`            | GET    | Detalhes do webhook (segredo completo)         |
| `/api/webhooks/[id]`            | PUT    | Atualiza campos                                |
| `/api/webhooks/[id]`            | DELETE | Remove                                         |
| `/api/webhooks/[id]/test`       | POST   | Dispara um `test.ping` (sem novas tentativas)  |
| `/api/webhooks/[id]/deliveries` | GET    | Tentativas de entrega recentes de um webhook   |
| `/api/webhooks/validate-url`    | POST   | Validação prévia da URL (proteção contra SSRF) |

`GET /api/webhooks` mascara o segredo como `<primeiros 10 caracteres>...` para evitar vazamentos
nas páginas de listagem. Use o GET de `[id]` quando realmente precisar do segredo.

### Criar webhook

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

Se `secret` for omitido, o servidor gerará um segredo `whsec_<hex>` e o retornará
na resposta.

### Testar webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Retorna `{ delivered, status, error }`. Nenhuma nova tentativa é realizada — útil para
validar rapidamente se o destinatário aceita o payload e a assinatura.

## Painel

A página do painel em `/dashboard/webhooks` (consulte
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) oferece:

- Criação/edição de webhooks com um seletor de eventos
- Indicador de status (ativo / inativo / com erro) baseado em `enabled`,
  `failure_count` e `last_status`
- Entrega de teste com um clique
- Alternância manual entre ativado/desativado

## Exemplos de payloads

### request.completed

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### test.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Os formatos dos campos para eventos diferentes de `test.ping` são definidos pelos locais de chamada que os emitem; trate o objeto `data` como compatível com versões futuras (adicione campos, não dependa da ausência deles).

## Práticas recomendadas

- **Verifique a assinatura em cada entrega** usando o corpo bruto — isso impede
  POSTs falsificados por qualquer pessoa que descubra a URL do seu webhook.
- **Responda com 2xx em até ~5 segundos** — o dispatcher atinge o tempo limite após 10 s. Receptores
  lentos consumirão novas tentativas e aumentarão `failure_count`.
- **Torne os manipuladores idempotentes** — novas tentativas e a semântica de entrega pelo menos uma vez
  significam que duplicatas são possíveis.
- **Assine apenas o necessário** — liste somente os eventos que você realmente consome; `"*"` adicionará
  custos a receptores que você não controla.
- **Monitore `failure_count`** — os endpoints são desativados automaticamente após 10 falhas
  consecutivas; redefina-o chamando `PUT /api/webhooks/[id]` com `enabled: true`
  após corrigir o receptor.
- **Alterne os segredos periodicamente** — envie um novo `secret` via `PUT`, implante o novo valor
  no receptor e confirme por meio do endpoint de teste.

## Consulte também

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — superfície completa da API de gerenciamento
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — semântica de circuit breaker / cooldown
  por trás das falhas de provedores expostas por meio de `request.failed`
- Código-fonte: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
