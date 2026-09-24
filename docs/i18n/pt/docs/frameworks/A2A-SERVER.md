# OmniRoute A2A Server Documentation (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute como agente de encaminhamento inteligente

A interface A2A tem duas vertentes:

- **JSON-RPC 2.0** em `POST /a2a` (ponto de entrada canónico, definido em `src/app/a2a/route.ts`).
- **REST** em `/api/a2a/*` para painéis e ferramentas (estado, lista de tarefas, cancelamento).

As tarefas são monitorizadas por `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL predefinido de 5 minutos). As competências são encaminhadas através de `A2A_SKILL_HANDLERS` em `src/lib/a2a/taskExecution.ts`.

## Descoberta do agente

```bash
curl http://localhost:20128/.well-known/agent.json
```

Devolve o Cartão do Agente que descreve as capacidades, competências e requisitos de autenticação do OmniRoute.

O campo `version` do Cartão do Agente é obtido a partir de `process.env.npm_package_version` (consulte `src/app/.well-known/agent.json/route.ts:13`), pelo que permanece automaticamente sincronizado com o `package.json` em cada versão.

---

## Autenticação

Todos os pedidos a `/a2a` requerem uma chave de API através do cabeçalho `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Se não estiver configurada qualquer chave de API no servidor, a autenticação é ignorada.

## Ativação

O A2A é controlado pela opção **Endpoints → A2A** e está desativado por predefinição. Quando está desativado,
`GET /api/a2a/status` comunica `status: "disabled"` e `online: false`; as chamadas JSON-RPC para
`POST /a2a` devolvem HTTP 503 com o código de erro JSON-RPC `-32000`.

---

## Métodos JSON-RPC 2.0

### `message/send` — Execução síncrona

Envia uma mensagem para uma competência e aguarda pela resposta completa.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

**Resposta:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": {
        "estimated": 0.005,
        "actual": 0.003,
        "currency": "USD"
      },
      "resilience_trace": [
        {
          "event": "primary_selected",
          "provider": "anthropic",
          "timestamp": "..."
        }
      ],
      "policy_verdict": {
        "allowed": true,
        "reason": "within budget and quota limits"
      }
    }
  }
}
```

### `message/stream` — Transmissão SSE

Igual a `message/send`, mas devolve Eventos Enviados pelo Servidor para transmissão em tempo real.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**Eventos SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Consultar o estado da tarefa

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Cancelar uma tarefa

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Competências Disponíveis

O OmniRoute disponibiliza 6 competências A2A configuradas em `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Cada módulo de competência encontra-se em `src/lib/a2a/skills/`.

| Competência                | ID                   | Descrição                                                                                                                                                                                            | Etiquetas                          | Exemplos                                          |
| :------------------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------- | :------------------------------------------------ |
| Encaminhamento Inteligente | `smart-routing`      | Encaminha um pedido através do fornecedor/combinação ideal, utilizando o motor de combinações e a pontuação do OmniRoute                                                                             | encaminhamento, fornecedores       | "Encaminhar este pedido através do melhor modelo" |
| Gestão de Quotas           | `quota-management`   | Comunica o estado da quota por fornecedor e ajuda os clientes a decidir quando limitar/mudar                                                                                                         | quota, fornecedores                | "Verificar a quota da anthropic"                  |
| Descoberta de Fornecedores | `provider-discovery` | Lista os fornecedores instalados, incluindo capacidades, indicadores de nível gratuito e estado do OAuth                                                                                             | fornecedores, descoberta           | "Que fornecedores estão disponíveis?"             |
| Análise de Custos          | `cost-analysis`      | Estima o custo de um pedido/conversa com base no catálogo e na utilização recente                                                                                                                    | custo, utilização                  | "Estimar o custo desta conversa"                  |
| Relatório de Estado        | `health-report`      | Agrega o estado do disjuntor, do período de espera e do bloqueio por fornecedor                                                                                                                      | estado, resiliência                | "Mostrar o estado de todos os fornecedores"       |
| Listar Capacidades         | `list-capabilities`  | Devolve o catálogo completo de 45 entradas de Competências de Agente (23 de API + 21 de CLI + 1 de configuração) como uma tabela markdown com URLs SKILL.md não processados para injeção de contexto | catálogo, descoberta, competências | "Listar todas as capacidades do OmniRoute"        |

> O Cartão do Agente deve ser mantido alinhado com o catálogo ativo de 352 fornecedores; as contagens de fornecedores e os metadados de acesso gratuito/sem autenticação têm como origem o registo em tempo de execução.

### Detalhes da Competência `list-capabilities`

A competência `list-capabilities` é particularmente útil para agentes externos que necessitam de descobrir o que o OmniRoute disponibiliza antes de enviarem chamadas de API. Devolve um artefacto de tabela markdown estruturada:

```
| ID | Nome | Categoria | Área | Endpoints/Comandos | URL não processado |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Autenticação e Sessões | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Cada linha inclui a coluna `rawUrl`, para que os agentes possam obter imediatamente o SKILL.md completo. O campo `metadata.totalSkills` reflete o tamanho do catálogo (atualmente, 45). Implementação: `src/lib/a2a/skills/listCapabilities.ts`. Consulte também [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## API REST (auxiliar)

O endpoint JSON-RPC `/a2a` é o ponto de entrada A2A canónico. Os endpoints REST abaixo fornecem acesso auxiliar para painéis de controlo e ferramentas externas:

| Endpoint                     | Método | Descrição                                                           | Autenticação                                 |
| :--------------------------- | :----- | :------------------------------------------------------------------ | :------------------------------------------- |
| `/api/a2a/status`            | GET    | Estado do servidor, competências registadas                         | (público)                                    |
| `/api/a2a/tasks`             | GET    | Listar tarefas com filtros                                          | gestão                                       |
| `/api/a2a/tasks/[id]`        | GET    | Obter tarefa por ID                                                 | gestão                                       |
| `/api/a2a/tasks/[id]/cancel` | POST   | Cancelar tarefa em execução                                         | gestão                                       |
| `/.well-known/agent.json`    | GET    | Cartão do Agente (descoberta A2A)                                   | (público, em cache durante 3600s)            |
| `/api/a2a/tasks`             | POST   | Delegação de entrada para a frota OmniConductor (Conductor PRD RF5) | Bearer vs `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Delegação de entrada do Conductor (`POST /api/a2a/tasks`):** os agentes A2A externos delegam trabalho de programação à frota OmniConductor através do OmniRoute. Corpo: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — apenas as competências da frota Conductor (as anunciadas no Cartão do Agente) podem ser delegadas; `metadata.conductor.repo.url` é obrigatório (a frota trabalha em repositórios git). A rota traduz o pedido para o `POST /v1/tasks` do hub utilizando o `CONDUCTOR_ORCHESTRATOR_TOKEN` do lado do servidor (com recurso a `CONDUCTOR_HUB_TOKEN` como alternativa) e devolve `201 { conductor_task_id, state: "submitted" }`; os estados das tarefas são propagados através do espelho SSE→A2A (RF1) e ficam visíveis através de `GET /api/a2a/tasks?skill=conductor`.

---

## Adicionar uma nova competência

1. **Criar o ficheiro da competência:** `src/lib/a2a/skills/<your-skill>.ts`

   Exporte uma função assíncrona `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Siga a estrutura das competências existentes, como `smartRouting.ts`.

2. **Registar o manipulador:** em `src/lib/a2a/taskExecution.ts`, adicione uma entrada a `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...competências existentes
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Expor no Cartão do Agente:** em `src/app/.well-known/agent.json/route.ts`, acrescente ao array `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Escrever testes:** `tests/unit/a2a-<your-skill>.test.ts`. Abranja o percurso de sucesso e o percurso de erro.

5. **Documentar** a nova competência na tabela `Competências disponíveis` deste ficheiro.

---

## TTL das tarefas

As tarefas expiram após `ttlMinutes` (predefinição: 5 min) — configurado no construtor `A2ATaskManager` em `src/lib/a2a/taskManager.ts:82`. Para personalizar, faça um fork da instanciação de `A2ATaskManager` e indique um valor diferente (por exemplo, `new A2ATaskManager(15)` para um TTL de 15 minutos). Um intervalo em segundo plano elimina as tarefas expiradas a cada 60 segundos.

---

## Ciclo de vida das tarefas

```
submetida → em curso → concluída
                     → falhou
                     → cancelada
```

- Por predefinição, as tarefas expiram após 5 minutos (consulte [TTL das tarefas](#task-ttl))
- Estados terminais: `completed`, `failed`, `cancelled`
- O registo de eventos acompanha todas as transições de estado

---

## Códigos de erro

| Código | Significado                          |
| :----- | :----------------------------------- |
| -32700 | Erro de análise (JSON inválido)      |
| -32600 | Pedido inválido / Não autorizado     |
| -32601 | Método ou competência não encontrado |
| -32602 | Parâmetros inválidos                 |
| -32603 | Erro interno                         |
| -32000 | O endpoint A2A está desativado       |

---

## Exemplos de integração

### Python (requests)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (fetch)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
