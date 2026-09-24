# Webhooks (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Fonte fidedigna:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute pode acionar webhooks HTTP em eventos da plataforma. Utilize-os para integrar com o
Slack, PagerDuty, Datadog, serviços internos de alerta ou qualquer recetor HTTP.

O dispatcher assina cada entrega com HMAC-SHA256, efetua novas tentativas em caso de
falhas transitórias, monitoriza o estado das entregas por webhook e desativa automaticamente os endpoints que
continuam a falhar.

## Eventos suportados

O tipo `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, utilizado por `src/lib/webhookDispatcher.ts`) modela atualmente exatamente quatro eventos:

| Evento              | Acionado quando                                               |
| ------------------- | ------------------------------------------------------------- |
| `request.completed` | Um pedido encaminhado é concluído com êxito                   |
| `request.failed`    | Um pedido encaminhado falha após todas as tentativas/fallback |
| `quota.exceeded`    | Uma chave de API ultrapassa um limite de orçamento/quota      |
| `test.ping`         | Evento sintético utilizado pelo endpoint de teste             |

As subscrições aceitam o literal `"*"` para receber todos os eventos. Os nomes de eventos
desconhecidos em `events` são ignorados durante o envio.

> Nota: a API do dispatcher está ligada, mas os pontos de chamada em produção para alguns dos
> eventos que não são `test.ping` ainda estão a ser implementados. Consulte `grep dispatchEvent` para saber
> que fluxos invocam atualmente o dispatcher na sua versão.

## Arquitetura

```
Chamador (handler, serviço, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filtrar por webhook.events
    -> para cada correspondência (em paralelo):
       deliverWebhook(url, payload, secret)
         criar payload { event, timestamp, data }
         assinar o corpo com HMAC-SHA256 (se existir um segredo)
         POST com timeout de 10 s
         repetir até 3 vezes em caso de erro 5xx / erro de rede
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

O envio é efetuado sem aguardar o resultado para o chamador: `Promise.allSettled` ignora
os erros individuais de cada webhook, pelo que um recetor com problemas não pode bloquear os restantes.

## Assinatura HMAC

Quando um webhook tem um `secret`, o OmniRoute assina o corpo JSON e envia:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <evento>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<HMAC-SHA256(secret, corpo) em hexadecimal>
```

> Os nomes dos cabeçalhos utilizam o prefixo `X-Webhook-*` (e não `X-OmniRoute-*`). O valor da assinatura
> é `sha256=<hex>` — verifique o prefixo completo.

Se `createWebhook` for chamado sem um segredo, o módulo da BD gera um
(`whsec_<48 hex>`) para que todos os webhooks sejam assinados por predefinição.

### Verificação no recetor

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Verifique sempre utilizando o corpo **em bruto** do pedido, antes de qualquer análise do JSON.

## Política de Repetição e Falhas

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Tempo limite de 10 segundos por tentativa (`AbortController`).
- Uma resposta HTTP 2xx é considerada um sucesso.
- Uma resposta HTTP 3xx/4xx é considerada um estado final não repetível — registada como entregue
  com `success = res.ok`.
- Respostas HTTP 5xx e erros de rede são repetidos com espera exponencial:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Após `maxRetries`, a entrega é registada como falhada.
- Cada entrega atualiza `last_triggered_at`, `last_status` e repõe a zero
  ou incrementa `failure_count`.
- O despachante chama `disableWebhooksWithHighFailures(10)` após cada distribuição,
  pelo que qualquer webhook com `failure_count >= 10` é automaticamente desativado.

## Base de Dados

Tabela `webhooks` (migração `011_webhooks.sql`):

| Coluna              | Tipo    | Notas                                                      |
| ------------------- | ------- | ---------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                       |
| `url`               | TEXT    | URL de destino                                             |
| `events`            | TEXT    | Matriz JSON; predefinição `["*"]`                          |
| `secret`            | TEXT    | Segredo HMAC (gerado automaticamente se não for fornecido) |
| `enabled`           | INT     | 0/1; predefinição 1                                        |
| `description`       | TEXT    | Etiqueta descritiva opcional                               |
| `created_at`        | TEXT    | `datetime('now')`                                          |
| `last_triggered_at` | TEXT    | Atualizado em cada tentativa de entrega                    |
| `last_status`       | INT     | Estado HTTP da última tentativa (0 = rede)                 |
| `failure_count`     | INT     | Reposto a 0 em caso de sucesso, +1 em caso de falha        |

O histórico de entregas é mantido na tabela dedicada `webhook_deliveries`
(migração `069_webhook_deliveries.sql`, escrito através de
`src/lib/db/webhookDeliveries.ts::insertDelivery` em cada tentativa), além
dos contadores agregados na linha de `webhooks`. Os metadados de tipo (Slack / Discord /
Telegram / transformadores de payload personalizados) foram adicionados por `070_webhooks_kind_metadata.sql`.

## API REST

Todos os endpoints exigem autenticação de gestão (`requireManagementAuth`).

| Endpoint                        | Método | Descrição                                      |
| ------------------------------- | ------ | ---------------------------------------------- |
| `/api/webhooks`                 | GET    | Listar webhooks (segredos ocultados)           |
| `/api/webhooks`                 | POST   | Criar webhook                                  |
| `/api/webhooks/[id]`            | GET    | Detalhes do webhook (segredo completo)         |
| `/api/webhooks/[id]`            | PUT    | Atualizar campos                               |
| `/api/webhooks/[id]`            | DELETE | Remover                                        |
| `/api/webhooks/[id]/test`       | POST   | Acionar um `test.ping` (sem repetições)        |
| `/api/webhooks/[id]/deliveries` | GET    | Tentativas de entrega recentes de um webhook   |
| `/api/webhooks/validate-url`    | POST   | Validação prévia do URL (proteção contra SSRF) |

`GET /api/webhooks` oculta o segredo no formato `<first 10 chars>...` para evitar a sua exposição
nas páginas de listagem. Utilize o GET de `[id]` quando precisar efetivamente do segredo.

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

Se `secret` for omitido, o servidor gera um segredo `whsec_<hex>` e devolve-o
na resposta.

### Testar webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Devolve `{ delivered, status, error }`. Não são efetuadas novas tentativas — útil para
validar rapidamente se o recetor aceita o payload e a assinatura.

## Painel

A página do painel em `/dashboard/webhooks` (consulte
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) disponibiliza:

- Criação/edição de webhooks com um seletor de eventos
- Indicador de estado (ativo / inativo / com erro) baseado em `enabled`,
  `failure_count` e `last_status`
- Envio de teste com um clique
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

As estruturas dos campos para eventos que não sejam `test.ping` são definidas pelos locais de chamada que os emitem; considere o objeto `data` compatível com versões futuras (adicione campos, não dependa da respetiva ausência).

## Boas práticas

- **Verifique a assinatura em cada envio** relativamente ao corpo bruto — isto impede
  pedidos POST falsificados por alguém que adivinhe o URL do seu webhook.
- **Responda com 2xx dentro de ~5 segundos** — o dispatcher excede o tempo limite aos 10 s. Os
  recetores lentos consumirão novas tentativas e aumentarão `failure_count`.
- **Torne os handlers idempotentes** — as novas tentativas e a semântica de entrega
  pelo menos uma vez significam que podem ocorrer duplicados.
- **Subscreva apenas o necessário** — liste apenas os eventos que realmente consome; `"*"`
  aumentará os custos nos recetores que não controla.
- **Monitorize `failure_count`** — os endpoints são desativados automaticamente após 10
  falhas consecutivas; reponha o estado ao chamar `PUT /api/webhooks/[id]` com `enabled: true`
  depois de corrigir o recetor.
- **Altere os segredos periodicamente** — envie um pedido `PUT` com um novo `secret`, implemente o novo valor
  no recetor e confirme através do endpoint de teste.

## Consulte também

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — superfície completa da API de gestão
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — semântica de circuit breaker / cooldown
  subjacente às falhas de fornecedores apresentadas através de `request.failed`
- Código-fonte: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
